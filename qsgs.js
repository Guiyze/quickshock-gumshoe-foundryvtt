import {qsgs} from "./module/config.js";
import QSGSItem from "./module/QSGSItem.js";
import QSGSItemSheet from "./module/sheets/QSGSItemSheet.js";
import QSGSCharSheet from "./module/sheets/QSGSCharSheet.js";

async function loadHandleBarTemplates()
{
  // register templates parts
  const templatePaths = [
    "systems/qsgs/templates/sheets/items/partials/ability-sheet.hbs",
    "systems/qsgs/templates/sheets/actors/partials/card-sheet.hbs",
    "systems/qsgs/templates/sheets/actors/partials/pc-info.hbs",
    "systems/qsgs/templates/sheets/actors/partials/pc-ability-text.hbs",
    "systems/qsgs/templates/sheets/actors/partials/pc-ability-page.hbs"
  ];
  return loadTemplates( templatePaths );
}

Hooks.once("init", function() {
    console.log("quickshock-gumshoe | Initialising QuickShock GUMSHOE System");

    loadHandleBarTemplates();

    CONFIG.qsgs= qsgs;
    CONFIG.Item.entityClass = QSGSItem;

    Items.unregisterSheet("core", ItemSheet)
    Items.registerSheet("quickshock-gumshoe", QSGSItemSheet, { makeDefault: true});

    Actors.unregisterSheet("core", ItemSheet)
    Actors.registerSheet("quickshock-gumshoe", QSGSCharSheet, { makeDefault: true});

    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
});