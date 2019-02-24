var PLAYER = {
  "max_health": 30,
  "health": 30,
  "speed": 10,
  "damage": 5,
  "experience": 0,
  "inventory": [],
  "equipped_item": "",
  get_adjusted_damage: function () {
    if (this.equipped_item !== "") {
      console.log("player has an item equipped.");
      if (ITEMS[this.equipped_item].hasOwnProperty("damage")) {
        console.log("equipped item has damage");
        return this.damage + ITEMS[this.equipped_item].damage;
      }
    }
    return this.damage;
  },
  get_inventory_str: function () {
    if (this.inventory.length > 0) {
      inv_item_names = [];
      for (var i = 0; i < this.inventory.length; i++) {
        inv_item_names.push(ITEMS[this.inventory[i]].name);
      }
      return inv_item_names.join(", ");
    }else{
      return "";
    }
  }

};