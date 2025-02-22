/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { CoziCardConfig } from './types';
import { customElement, property, state } from 'lit/decorators';
import { formfieldDefinition } from '../elements/formfield';
import { selectDefinition } from '../elements/select';
import { switchDefinition } from '../elements/switch';
import { textfieldDefinition } from '../elements/textfield';

@customElement('cozi-card-editor')
export class CoziCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: CoziCardConfig;

  @state() private _helpers?: any;

  private _initialized = false;

  static elementDefinitions = {
    ...textfieldDefinition,
    ...selectDefinition,
    ...switchDefinition,
    ...formfieldDefinition,
  };

  public setConfig(config: CoziCardConfig): void {
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _name(): string {
    return this._config?.name || '';
  }

  get _list(): [number, string, string, string] {
    return this._config?.list || [0 , "", "", ""];
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    interface list {
      index: number;
      title: string;
      listId: string;
      listType: string;
    }

    const listObjects: list[] = Object.values(this.hass.states['sensor.cozi_lists'].attributes.lists)
    const lists = listObjects.map((xx, index) => {
    return <list>
      {
        index: index,
        title: xx.title,
        listId: xx.listId,
        listType: xx.listType,
      };
    });

    return html`
      <mwc-select
        naturalMenuWidth
        fixedMenuPosition
        label="List (Required)"
        .configValue=${'list'}
        .value=${this._list}
        @selected=${this._valueChanged}
        @closed=${(ev) => ev.stopPropagation()}
      >
        ${lists.map((xx) => {
          return html`<mwc-list-item .value=${[xx.index, xx.title, xx.listId, xx.listType]}>${xx.title}</mwc-list-item>`;
        })}
      </mwc-select>
      <mwc-textfield
        label="Name (Optional: Uses Cozi list name by default)"
        .value=${this._name}
        .configValue=${'name'}
        @input=${this._valueChanged}
      ></mwc-textfield>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      console.debug("return1");
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      console.debug("return2");
      return;
    }
    if (target.configValue) {
      console.debug("if1");
      if (target.value === '') {
        console.debug("if2");
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        console.debug("else");
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    console.debug("config-changed");
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles: CSSResultGroup = css`
    mwc-select,
    mwc-textfield {
      margin-bottom: 16px;
      display: block;
    }
    mwc-formfield {
      padding-bottom: 8px;
    }
    mwc-switch {
      --mdc-theme-secondary: var(--switch-checked-color);
    }
  `;
}
