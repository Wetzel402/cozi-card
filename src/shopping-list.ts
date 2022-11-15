import { mdiHomeAssistant } from '@mdi/js';
import { HomeAssistant } from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

export interface ShoppingListItem {
  readonly itemId: string;
  itemType: string | null;
  status: boolean;
  text: string;
  itemPos: number;
}

export const fetchItems = (items): Promise<ShoppingListItem> =>
  items.map((xx, index) => {
    const statusText = xx.status;
    let status = false;
    if (statusText == "complete") {
      status = true;
    }
    else {
      status = false;
    }
    return <ShoppingListItem>
      {
      itemId: xx.itemId,
      itemType: xx.itemType,
      status: status,
      text: xx.text,
      itemPos: index,
    };
});

export const editItem = (
  hass: HomeAssistant,
  listId: string,
  itemId: string,
  text: string,
): Promise<void> =>
hass.callService('cozi', 'edit_item', {
  list_id: listId,
  item_id: itemId,
  item_text: text,
});

export const markItem = (
  hass: HomeAssistant,
  listId: string,
  itemId: string,
  status: string,
): Promise<void> =>
hass.callService('cozi', 'mark_item', {
  list_id: listId,
  item_id: itemId,
  status: status,
});

export const clearItems = (
  hass: HomeAssistant,
  listId: string,
  itemIds: string[],
): Promise<void> =>
hass.callService('cozi', 'remove_items', {
  list_id: listId,
  item_ids: itemIds,
});

export const addItem = (
  hass: HomeAssistant,
  listId: string,
  itemText: string,
  itemPos: number,
): Promise<void> =>
hass.callService('cozi', 'add_item', {
  list_id: listId,
  item_text: itemText,
  item_pos: itemPos,
});

export const reorderItems = (
  hass: HomeAssistant,
  itemIds: string[]
): Promise<ShoppingListItem> =>
  hass.callWS({
    type: "shopping_list/items/reorder",
    item_ids: itemIds,
  });