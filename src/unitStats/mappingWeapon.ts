import { resolveLocstring } from "./locstring";
import { traverseTree } from "./unitStatsLib";

let WeaponStats: WeaponType[];

export type WeaponStatsType = {
  accuracy_near: number;
  accuracy_mid: number;
  accuracy_far: number;

  aim_time_multiplier_near: number;
  aim_time_multiplier_mid: number;
  aim_time_multiplier_far: number;
  fire_aim_time_min: number;
  fire_aim_time_max: number;

  burst_can_burst: boolean;
  burst_duration_min: number;
  burst_duration_max: number;
  burst_duration_multiplier_near: number;
  burst_duration_multiplier_mid: number;
  burst_duration_multiplier_far: number;
  burst_rate_of_fire_min: number;
  burst_rate_of_fire_max: number;
  burst_rate_of_fire_multiplier_near: number;
  burst_rate_of_fire_multiplier_mid: number;
  burst_rate_of_fire_multiplier_far: number;

  cooldown_duration_min: number;
  cooldown_duration_max: number;
  cooldown_duration_multiplier_near: number;
  cooldown_duration_multiplier_mid: number;
  cooldown_duration_multiplier_far: number;

  cover_table_tp_defcover_accuracy_multiplier: number;
  cover_table_tp_defcover_damage_multiplier: number;
  cover_table_tp_defcover_penetration_multiplier: number;

  cover_table_tp_garrison_cover_accuracy_multiplier: number;
  cover_table_tp_garrison_cover_damage_multiplier: number;
  cover_table_tp_garrison_cover_penetration_multiplier: number;

  cover_table_tp_heavy_cover_accuracy_multiplier: number;
  cover_table_tp_heavy_cover_damage_multiplier: number;
  cover_table_tp_heavy_cover_penetration_multiplier: number;

  cover_table_tp_light_cover_accuracy_multiplier: number;
  cover_table_tp_light_cover_damage_multiplier: number;
  cover_table_tp_light_cover_penetration_multiplier: number;

  damage_damage_type: string;
  damage_min: number;
  damage_max: number;

  default_attack_type: string;

  fire_wind_down: number;
  fire_wind_up: number;

  moving_accuracy_multiplier: number;
  moving_burst_multiplier: number;
  moving_can_fire_while_moving: boolean;
  moving_cooldown_multiplier: number;

  penetration_near: number;
  penetration_mid: number;
  penetration_far: number;

  range_distance_near: number;
  range_distance_mid: number;
  range_distance_far: number;

  range_min: number;
  range_max: number;

  reload_duration_min: number;
  reload_duration_max: number;

  reload_duration_multiplier_near: number;
  reload_duration_multiplier_mid: number;
  reload_duration_multiplier_far: number;

  reload_frequency_min: number;
  reload_frequency_max: number;

  target_type_table: [];
};

// Maps a single weapon entity
type WeaponType = {
  // might be a bit redundant by now

  //@todo remvoe redundancy from prototyping
  id: string; // file name in essence editor
  ui_name: string; // name in game
  icon_name: string; // icon path in game
  weapon_bag: WeaponStatsType; // weapon data
  pbgid: string; // essence id
  path: string; // root object e.g africa_korps
  label: string; // label for search selection
  value: string; // value for search selection
  description: string; // search selection description
  faction: string; // faction string e.g. afrika_korps
  parent: string; // parent file (essence parent folder, eg. rifle, light_machine_gun....)
};

const mapWeaponData = (key: string, node: any, jsonPath: string, parent: string) => {
  const weapon_bag: any = node.weapon_bag;

  // todo remove redundancy
  const weaponData: WeaponType = {
    id: key,
    ui_name: resolveLocstring(weapon_bag.ui_name),
    icon_name: weapon_bag.icon_name || "",
    pbgid: node.pbgid,
    path: jsonPath,
    label: key,
    value: key,
    description: resolveLocstring(weapon_bag.ui_name),
    faction: jsonPath.split("/")[0],
    parent: parent,
    weapon_bag: {
      accuracy_near: weapon_bag.accuracy?.near || 0,
      accuracy_mid: weapon_bag.accuracy?.mid || 0,
      accuracy_far: weapon_bag.accuracy?.far || 0,

      aim_time_multiplier_near: weapon_bag.aim?.aim_time_multiplier?.near || 1,
      aim_time_multiplier_mid: weapon_bag.aim?.aim_time_multiplier?.mid || 1,
      aim_time_multiplier_far: weapon_bag.aim?.aim_time_multiplier?.far || 1,
      fire_aim_time_min: weapon_bag?.fire_aim_time?.min || 0,
      fire_aim_time_max: weapon_bag?.fire_aim_time?.max || 0,

      burst_can_burst: weapon_bag?.burst?.can_burst == "True" ? true : false,
      burst_duration_min: weapon_bag.burst?.duration?.min || 0,
      burst_duration_max: weapon_bag.burst?.duration?.max || 0,
      burst_duration_multiplier_near: weapon_bag.burst?.duration_multiplier?.near || 1,
      burst_duration_multiplier_mid: weapon_bag.burst?.duration_multiplier?.mid || 1,
      burst_duration_multiplier_far: weapon_bag.burst?.duration_multiplier?.far || 1,
      burst_rate_of_fire_min: weapon_bag.burst?.rate_of_fire?.min || 0,
      burst_rate_of_fire_max: weapon_bag.burst?.rate_of_fire?.max || 0,
      burst_rate_of_fire_multiplier_near: weapon_bag.burst?.rate_of_fire_multiplier?.near || 1,
      burst_rate_of_fire_multiplier_mid: weapon_bag.burst?.rate_of_fire_multiplier?.mid || 1,
      burst_rate_of_fire_multiplier_far: weapon_bag.burst?.rate_of_fire_multiplier?.far || 1,

      cooldown_duration_min: weapon_bag.cooldown?.duration?.min || 0,
      cooldown_duration_max: weapon_bag.cooldown?.duration?.max || 0,
      cooldown_duration_multiplier_near: weapon_bag.cooldown?.duration_multiplier?.near || 1,
      cooldown_duration_multiplier_mid: weapon_bag.cooldown?.duration_multiplier?.mid || 1,
      cooldown_duration_multiplier_far: weapon_bag.cooldown?.duration_multiplier?.max || 1,

      cover_table_tp_defcover_accuracy_multiplier:
        weapon_bag.cover_table?.tp_defcover?.accuracy_multiplier || 1,
      cover_table_tp_defcover_damage_multiplier:
        weapon_bag.cover_table?.tp_defcover?.damage_multiplier || 1,
      cover_table_tp_defcover_penetration_multiplier:
        weapon_bag.cover_table?.tp_defcover?.penetration_multiplier || 1,

      cover_table_tp_garrison_cover_accuracy_multiplier:
        weapon_bag.cover_table?.tp_garrison_cover?.accuracy_multiplier || 1,
      cover_table_tp_garrison_cover_damage_multiplier:
        weapon_bag.cover_table?.tp_garrison_cover?.damage_multiplier || 1,
      cover_table_tp_garrison_cover_penetration_multiplier:
        weapon_bag.cover_table?.tp_garrison_cover?.penetration_multiplier || 1,

      cover_table_tp_heavy_cover_accuracy_multiplier:
        weapon_bag.cover_table?.tp_heavy_cover?.accuracy_multiplier || 1,
      cover_table_tp_heavy_cover_damage_multiplier:
        weapon_bag.cover_table?.tp_heavy_cover?.damage_multiplier || 1,
      cover_table_tp_heavy_cover_penetration_multiplier:
        weapon_bag.cover_table?.tp_heavy_cover?.penetration_multiplier || 1,

      cover_table_tp_light_cover_accuracy_multiplier:
        weapon_bag.cover_table?.tp_light_cover?.accuracy_multiplier || 1,
      cover_table_tp_light_cover_damage_multiplier:
        weapon_bag.cover_table?.tp_light_cover?.damage_multiplier || 1,
      cover_table_tp_light_cover_penetration_multiplier:
        weapon_bag.cover_table?.tp_light_cover?.penetration_multiplier || 1,

      damage_damage_type: weapon_bag.damage?.damage_type || "",
      damage_min: weapon_bag.damage?.min || 0,
      damage_max: weapon_bag.damage?.max || 0,

      default_attack_type: weapon_bag.default_attack_type || "",

      fire_wind_down: weapon_bag.fire?.wind_down || 0,
      fire_wind_up: weapon_bag.fire?.wind_down || 0,

      moving_accuracy_multiplier: weapon_bag.moving?.accuracy_multiplier || 1,
      moving_burst_multiplier: weapon_bag.moving?.burst_multiplier || 1,
      moving_can_fire_while_moving:
        weapon_bag.moving?.can_fire_while_moving == "True" ? true : false,
      moving_cooldown_multiplier: weapon_bag.moving?.cooldown_multiplier || 1,

      penetration_near: weapon_bag.penetration?.near || 0,
      penetration_mid: weapon_bag.penetration?.mid || 0,
      penetration_far: weapon_bag.penetration?.far || 0,

      range_distance_near: weapon_bag.range?.distance?.near || -1,
      range_distance_mid: weapon_bag.range?.distance?.mid || -1,
      range_distance_far: weapon_bag.range?.distance?.far || -1,

      range_min: weapon_bag.range?.min || 0,
      range_max: weapon_bag.range?.max || 0,

      reload_duration_min: weapon_bag.reload?.duration?.min || 0,
      reload_duration_max: weapon_bag.reload?.duration?.max || 0,

      reload_duration_multiplier_near: weapon_bag?.reload?.duration_multiplier?.near || 1,
      reload_duration_multiplier_mid: weapon_bag?.reload?.duration_multiplier?.mid || 1,
      reload_duration_multiplier_far: weapon_bag?.reload?.duration_multiplier?.far || 1,

      reload_frequency_min: weapon_bag.reload?.frequency?.min || 0,
      reload_frequency_max: weapon_bag.reload?.frequency?.max || 0,

      target_type_table: [],
    },
  };

  return weaponData;
};

// parses the attribute tree and initiates the mapping. Save
// the mapping array in global exporting variable.
const getWeaponStats = async () => {
  // make sure that this method is called only once among all pages
  if (WeaponStats) return WeaponStats;

  // Fetch JSON data
  const myReqWeapon = await fetch(
    "https://raw.githubusercontent.com/cohstats/coh3-data/master/data/weapon.json",
  );

  const root = await myReqWeapon.json();

  const weaponSetAll: WeaponType[] = [];

  // Extract from JSON
  for (const obj in root) {
    // find all weapon_bags
    const weaponSet = traverseTree(root[obj], isWeaponBagContainer, mapWeaponData, obj, obj);
    // weaponSet.forEach(weaponSetAll.add, weaponSetAll);

    // Filter relevant objects
    weaponSet.forEach((item: any) => {
      let weapon_icon;

      //if (!item.weapon_bag.weapon_class) return;

      // filter by relevant weapon types
      switch (item.parent) {
        case "sub_machine_gun":
          weapon_icon = "m1_thompson_sub_machine_gun.png";
          item.image = "/unitStats/weaponClass/" + weapon_icon;
          weaponSetAll.push(item);
          break;
        case "light_machine_gun":
          weapon_icon = "weapon_lmg_mg34.png";
          item.image = "/unitStats/weaponClass/" + weapon_icon;
          weaponSetAll.push(item);
          break;
        case "heavy_machine_gun":
          weapon_icon = "hmg_mg42_ger.png";
          item.image = "/unitStats/weaponClass/" + weapon_icon;
          weaponSetAll.push(item);
          break;
        case "rifle":
        case "sidearm":
          weapon_icon = "weapon_dp_28_lmg.png";
          item.image = "/unitStats/weaponClass/" + weapon_icon;
          weaponSetAll.push(item);
          break;
        case "anti_tank_gun":
          weapon_icon = "at_gun_icn.png";
          item.image = "/unitStats/weaponClass/" + weapon_icon;
          weaponSetAll.push(item);
          break;
        case "tank_gun":
        case "tungsten_round_upgrade":
          weapon_icon = "tanks2_icn.png";
          item.image = "/unitStats/weaponClass/" + weapon_icon;
          weaponSetAll.push(item);
          break;
        default:
          return;
      }
    });
  }

  // Set singleton
  WeaponStats = weaponSetAll;

  return weaponSetAll;
};

const setWeaponStats = (weaponStats: WeaponType[]) => {
  WeaponStats = weaponStats;
};

const isWeaponBagContainer = (key: string, obj: any) => {
  // check if first child is weapon_bag
  return Object.keys(obj)[0] === "weapon_bag";
};

export { WeaponStats, setWeaponStats, getWeaponStats };
export type { WeaponType };
