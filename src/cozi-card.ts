/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state, query } from 'lit/decorators';
import { classMap } from "lit/directives/class-map.js";
import { guard } from "lit/directives/guard.js";
import { repeat } from "lit/directives/repeat.js";
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
import type { HaTextField } from "./ha-textfield";
import type { CoziCardConfig } from './types';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

console.info(
  `%c  COZI-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'cozi-card',
  name: 'Cozi Card',
  description: 'A card that works with the Cozi custom integration.',
});

// TODO Name your custom element
@customElement('cozi-card')
export class CoziCard extends LitElement {
  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _list?: any;
  @state() private config!: CoziCardConfig;
	@state() private _uncheckedItems?: ShoppingListItem[];
	@state() private _checkedItems?: ShoppingListItem[];
	@state() private _reordering = false;
	@state() private _renderEmptySortable = false;
	private _sortable?: SortableInstance;
	@query("#sortable") private _sortableEl?: HTMLElement;

	firstrun: boolean;
	language: string;

	constructor() {
		super();
		this.firstrun = true;
		this.language = '';
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
    else if (!config.list || config.list.length != 3) {
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

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    if (this.firstrun) {
      this._list = this.hass.states["sensor.cozi_lists"].attributes.lists[this.config.list[0]].items;
      this._fetchData();
      this.firstrun = false;
    }

    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning'));
    }

    if (this.config.show_error) {
      return this._showError(localize('common.show_error'));
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
            @click=${this._addItem}
          >
          </ha-svg-icon>
          <ha-textfield
            class="addBox"
            .placeholder=${this.hass!.localize(
              "ui.panel.lovelace.cards.shopping-list.add_item"
            )}
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
                ${guard([this._uncheckedItems, this._renderEmptySortable], () =>
                  this._renderEmptySortable
                    ? ""
                    : this._renderItems(this._uncheckedItems!)
                )}
              </div>
            `
          : this._renderItems(this._uncheckedItems!)}
        ${this._checkedItems!.length > 0
          ? html`
              <div class="divider"></div>
              <div class="checked">
                <span>
                  ${this.hass!.localize(
                    "ui.panel.lovelace.cards.shopping-list.checked_items"
                  )}
                </span>
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
              ${repeat(
                this._checkedItems!,
                (item) => item.itemId,
                (item) =>
                  html`
                    <div class="editRow">
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
                    </div>
                  `
              )}
            `
          : ""}
      </ha-card>
    `;
  }

  private _renderItems(items: ShoppingListItem[]) {
    return html`
      ${repeat(
        items,
        (item) => item.itemId,
        (item) =>
          html`
            <div class="editRow" item-id=${item.itemId}>
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
          `
      )}
    `;
  }

  private async _fetchData(): Promise<void> {
    console.debug("fetchData");
		if (!this.hass) {
		return;
		}
		const checkedItems: ShoppingListItem[] = [];
    const uncheckedItems: ShoppingListItem[] = [];
    const items = fetchItems(this._list); //cannot be async
    for (const key in items) {
      if (items[key].itemType == "header") {
        //do nothing
      }
			else if (items[key].status) {
				checkedItems.push(items[key]);
			} else {
				uncheckedItems.push(items[key]);
			}
		}
		this._checkedItems = checkedItems;
    this._uncheckedItems = uncheckedItems;
	}

  private _refresh(): void {
    this.hass.callService('cozi', 'refresh').catch(() => this._fetchData());
  }
  private _completeItem(ev): void {
    let status = "";
    if (ev.target.checked) {
      status = "complete";
    }
    else {
      status = "incomplete";
    }
    markItem(
      this.hass!,
      this.config.list[2],
      ev.target.itemId,
      status,
    ).catch(() => this._fetchData());
  }

  private _saveEdit(ev): void {
    editItem(this.hass!,
      this.config.list[2],
      ev.target.itemId,
      ev.target.value,
    ).catch(() => this._fetchData());

    ev.target.blur();
  }

  private _clearItems(): void {
    if (this.hass) {
      const itemIds: string[] = [];
      this._checkedItems!.forEach(element => {
        itemIds.push(element.itemId);
      });
      clearItems(this.hass!,
        this.config.list[2],
        itemIds,
      ).catch(() => this._fetchData());
    }
  }

  private get _newItem(): HaTextField {
    return this.shadowRoot!.querySelector(".addBox") as HaTextField;
  }

  private _addItem(ev): void {
    const newItem = this._newItem;

    if (newItem.value!.length > 0) {
      addItem(this.hass!,
        this.config.list[2],
        newItem.value!,
        0,
      ).catch(() => this._fetchData());
    }

    newItem.value = "";
    if (ev) {
      newItem.focus();
    }
  }

  private _addKeyPress(ev): void {
    if (ev.keyCode === 13) {
      this._addItem(null);
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
      dataIdAttr: "item-id",
      handle: "ha-svg-icon",
      onEnd: async (evt) => {
        if (evt.newIndex === undefined || evt.oldIndex === undefined) {
          return;
        }
        // Since this is `onEnd` event, it's possible that
        // an item wa dragged away and was put back to its original position.
        if (evt.oldIndex !== evt.newIndex) {
          reorderItems(this.hass!, this._sortable!.toArray()).catch(() =>
            this._fetchData()
          );
          // Move the shopping list item in memory.
          this._uncheckedItems!.splice(
            evt.newIndex,
            0,
            this._uncheckedItems!.splice(evt.oldIndex, 1)[0]
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

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
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
        margin: 12px 0;
        justify-content: space-between;
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
