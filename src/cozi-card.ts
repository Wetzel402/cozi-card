/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state, query } from 'lit/decorators';
import { guard } from "lit/directives/guard.js";
import { mdiDrag, mdiNotificationClearAll, mdiPlus, mdiSort, mdiRefresh } from "@mdi/js";
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers
import {
  addItem,
  clearItems,
  fetchItems,
  reorderItems,
  ShoppingListItem,
  editItem,
  markItem,
} from "./shopping-list";
import {
	loadSortable,
	SortableInstance,
  } from "./sortable.ondemand";
import type { CoziCardConfig } from './types';
import {
  CARD_VERSION,
  CARD_TYPE,
  CARD_NAME,
  CARD_DESC,
  } from './const';
import { localize } from './localize/localize';

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: CARD_DESC,
});

// TODO Name your custom element
@customElement('cozi-card')
export class CoziCard extends LitElement {
  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: CoziCardConfig;
  @state() private _allItems?: ShoppingListItem[];
	@state() private _checkedItems?: ShoppingListItem[];
	@state() private _reordering = false;
	@state() private _renderEmptySortable = false;
	private _sortable?: SortableInstance;
	@query("#sortable") private _sortableEl?: HTMLElement;

	firstrun: boolean;

	constructor() {
    super();
    this._allItems = [];
    this._checkedItems = [];
    this.firstrun = true;
	}

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('cozi-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: CoziCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }
    else if (!config.list || config.list.length != 4) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      ...config,
    };
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, true);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    this._fetchData();
    if (this.firstrun) {
      console.info(
        `%c  COZI-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
        'color: orange; font-weight: bold; background: black',
        'color: white; font-weight: bold; background: dimgray',
      );
      this.firstrun = false;
    }

    return html`
      <ha-card>
      <div class="has-header">
      <ha-svg-icon
          class="addButton"
          .path=${mdiRefresh}
          @click=${this._refresh}
        >
        </ha-svg-icon>
        ${this.config.name || this.config.list[1]}
      </div>
        <div class="addRow">
          <ha-svg-icon
            class="addButton"
            .path=${mdiPlus}
            .title=${this.hass!.localize(
              "ui.panel.lovelace.cards.shopping-list.add_item"
            )}
            .itemPos=${0}
            @click=${this._addItem}
          >
          </ha-svg-icon>
          <ha-textfield
            class="addBox"
            .placeholder=${this.hass!.localize(
              "ui.panel.lovelace.cards.shopping-list.add_item"
            )}
            .itemPos=${0}
            @keydown=${this._addKeyPress}
          ></ha-textfield>
          <ha-svg-icon
            class="reorderButton"
            .path=${mdiSort}
            .title=${this.hass!.localize(
              "ui.panel.lovelace.cards.shopping-list.reorder_items"
            )}
            @click=${this._toggleReorder}
          >
          </ha-svg-icon>
        </div>
        ${this._reordering
          ? html`
              <div id="sortable">
                ${guard([this._allItems, this._renderEmptySortable], () =>
                  this._renderEmptySortable
                    ? ""
                    : this._renderItems(this._allItems!)
                )}
              </div>
            `
          : this._renderItems(this._allItems!)}
        ${this._checkedItems!.length > 0
          ? html`
              <div class="divider"></div>
              <div class="checked">
                <span></span>
                <ha-svg-icon
                  class="clearall"
                  tabindex="0"
                  .path=${mdiNotificationClearAll}
                  .title=${this.hass!.localize(
                    "ui.panel.lovelace.cards.shopping-list.clear_items"
                  )}
                  @click=${this._clearItems}
                >
                </ha-svg-icon>
              </div>
            `
          : ""}
      </ha-card>
    `;
  }

  private _renderItems(items: ShoppingListItem[]) {
    let content = html``;
    items.forEach((element) => {
      if (element.itemType == "header") {
        content = html`${content} ${this._renderHeader(element)}`;
      }
      if (element.status == true) {
        content = html`${content} ${this._renderChecked(element)}`;
      }
      if (element.status == false && element.itemType != "header") {
        content = html`${content} ${this._renderUnchecked(element)}`;
      }
    })
    return content;
  }

  private _renderHeader(item: ShoppingListItem) {
    return html`
      <div class="addRow item" item=${"{\"itemId\": \"" + item.itemId +
        "\", " + "\"itemType\": \"" + item.itemType! + "\", " + "\"status\": \"" +
        item.status + "\", " + "\"text\": \"" + item.text + "\"}"}>
        <ha-svg-icon
            class="addButton"
            .path=${mdiPlus}
            .title=${this.hass!.localize(
              "ui.panel.lovelace.cards.shopping-list.add_item"
            )}
            .itemPos=${item.itemPos}
            @click=${this._addItem}
          >
          </ha-svg-icon>
          <ha-textfield
            class="addBox"
            .placeholder=${item.text}
            .itemId=${item.itemId}
            .itemPos=${item.itemPos}
            @keydown=${this._addKeyPress}
          ></ha-textfield>
        ${this._reordering
        ? html`
              <ha-svg-icon
                .title=${this.hass!.localize(
          "ui.panel.lovelace.cards.shopping-list.drag_and_drop"
        )}
                class="reorderButton"
                .path=${mdiDrag}
              >
              </ha-svg-icon>
            `
        : ""}
      </div>
    `;
  }

  private _renderUnchecked(item: ShoppingListItem) {
    return html`
      <div class="editRow" item=${"{\"itemId\": \"" + item.itemId +
      "\", " + "\"itemType\": \"" + item.itemType! + "\", " + "\"status\": \"" +
      item.status + "\", " + "\"text\": \"" + item.text + "\"}"}>
        <ha-checkbox
          tabindex="0"
          .checked=${item.status}
          .itemId=${item.itemId}
          @change=${this._completeItem}
        ></ha-checkbox>
        <ha-textfield
          class="item"
          .value=${item.text}
          .itemId=${item.itemId}
          @change=${this._saveEdit}
        ></ha-textfield>
        ${this._reordering
        ? html`
              <ha-svg-icon
                .title=${this.hass!.localize(
          "ui.panel.lovelace.cards.shopping-list.drag_and_drop"
        )}
                class="reorderButton"
                .path=${mdiDrag}
              >
              </ha-svg-icon>
            `
        : ""}
      </div>
    `;
  }

  private _renderChecked(item: ShoppingListItem) {
    return html`
      <div class="editRow checked" item=${"{\"itemId\": \"" + item.itemId +
      "\", " + "\"itemType\": \"" + item.itemType! + "\", " + "\"status\": \"" +
      item.status + "\", " + "\"text\": \"" + item.text + "\"}"}>
        <ha-checkbox
          tabindex="0"
          .checked=${item.status}
          .itemId=${item.itemId}
          @change=${this._completeItem}
        ></ha-checkbox>
        <ha-textfield
          class="item"
          .value=${item.text}
          .itemId=${item.itemId}
          @change=${this._saveEdit}
        ></ha-textfield>
        ${this._reordering
        ? html`
              <ha-svg-icon
                .title=${this.hass!.localize(
          "ui.panel.lovelace.cards.shopping-list.drag_and_drop"
        )}
                class="reorderButton"
                .path=${mdiDrag}
              >
              </ha-svg-icon>
            `
        : ""}
      </div>
    `;
  }

  private async _fetchData(): Promise<void> {
		if (!this.hass) {
		return;
    }
    const allItems: ShoppingListItem[] = [];
		const checkedItems: ShoppingListItem[] = [];
    const items = fetchItems(this.hass.states["sensor.cozi_lists"].attributes.lists[this.config.list[0]].items); //cannot be async
    for (const key in items) {
      allItems.push(items[key]);
      if (items[key].status) {
				checkedItems.push(items[key]);
			}
    }
    this._allItems = allItems;
		this._checkedItems = checkedItems;
	}

  private async _refresh(): Promise<void> {
    await this.hass.callService('cozi', 'refresh');
  }

  private async _completeItem(ev): Promise<void> {
    let status = "";
    if (ev.target.checked) {
      status = "complete";
    }
    else {
      status = "incomplete";
    }
    await markItem(
      this.hass!,
      this.config.list[2],
      ev.target.itemId,
      status,
    );
  }

  private async _saveEdit(ev): Promise<void> {
    await editItem(this.hass!,
      this.config.list[2],
      ev.target.itemId,
      ev.target.value,
    );
    ev.target.blur();
  }

  private async _clearItems(): Promise<void> {
    if (this.hass) {
      const itemIds: string[] = [];
      this._checkedItems!.forEach(element => {
        itemIds.push(element.itemId);
      });
      await clearItems(this.hass!,
        this.config.list[2],
        itemIds,
      );
    }
  }

  private async _addItem(ev): Promise<void> {

    let index = ev.target.itemPos;
    if (index > 0) {
      index = index + 1;
    }
    if (ev.target.value.length > 0) {
      await addItem(this.hass!,
        this.config.list[2],
        ev.target.value,
        index,
      );
    }

    ev.target.value = "";
    if (ev) {
      ev.target.focus();
    }
  }

  private _addKeyPress(ev): void {
    if (ev.keyCode === 13) {
      this._addItem(ev);
    }
  }

  private async _toggleReorder() {
    this._reordering = !this._reordering;
    await this.updateComplete;
    if (this._reordering) {
      this._createSortable();
    } else {
      this._sortable?.destroy();
      this._sortable = undefined;
    }
  }

  private async _createSortable() {
    const Sortable = await loadSortable();
    const sortableEl = this._sortableEl;
    this._sortable = new Sortable(sortableEl!, {
      animation: 150,
      fallbackClass: "sortable-fallback",
      dataIdAttr: "item",
      handle: "ha-svg-icon",
      onEnd: async (evt) => {
        if (evt.newIndex === undefined || evt.oldIndex === undefined) {
          return;
        }
        // Since this is `onEnd` event, it's possible that
        // an item wa dragged away and was put back to its original position.
        if (evt.oldIndex !== evt.newIndex) {
          reorderItems(this.hass!, this.config.list[2], this.config.list[1], JSON.parse("[" + this._sortable!.toArray() + "]"), this.config.list[3]).catch(() =>
            this._fetchData()
          );
          // Move the shopping list item in memory.
          this._allItems!.splice(
            evt.newIndex,
            0,
            this._allItems!.splice(evt.oldIndex, 1)[0]
          );
        }
        this._renderEmptySortable = true;
        await this.updateComplete;
        while (sortableEl?.lastElementChild) {
          sortableEl.removeChild(sortableEl.lastElementChild);
        }
        this._renderEmptySortable = false;
      },
    });
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
      }
      .has-header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
        text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
        opacity: var(--dark-primary-opacity);
        padding: 0px 0px 10px 0px;
        width: 100%
      }
      .editRow,
      .addRow,
      .checked {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .item {
        margin-top: 8px;
      }
      .addButton {
        padding-right: 16px;
        padding-inline-end: 16px;
        cursor: pointer;
        direction: var(--direction);
      }
      .reorderButton {
        padding-left: 16px;
        padding-inline-start: 16px;
        cursor: pointer;
        direction: var(--direction);
      }
      ha-checkbox {
        margin-left: -12px;
        margin-inline-start: -12px;
        direction: var(--direction);
      }
      ha-textfield {
        flex-grow: 1;
      }
      .checked {
        justify-content: space-between;
        text-decoration: line-through;
        opacity: 0.6;
      }
      .checked span {
        color: var(--primary-text-color);
        font-weight: 500;
      }
      .divider {
        height: 1px;
        background-color: var(--divider-color);
        margin: 10px 0;
      }
      .clearall {
        cursor: pointer;
      }
    `;
  }
}
