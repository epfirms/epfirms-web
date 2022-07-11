
export enum PiSettingsMode  {
    Client = "CLIENT",
    Child = "CHILD",
    Family= "FAMILY",
    Spouse = "SPOUSE",
    Appointee = "APPOINTEE",
}




/**
 * Settings for the PiTable component. AKA Personal Information Table.
 * Controls which personal information fields are displayed.
 */
export class PiSettings {
  displayEmail?: boolean;
  displayHomePhone?: boolean;
  displayCellPhone?: boolean;
  displayMinorToggle?: boolean;
  displayRelationship?: boolean;
  displayHasSpouse?: boolean;
  displayRank?: boolean;
  displaySpecialNeeds?: boolean;
  displayDob?: boolean;
  displayExcluded?: boolean;
  displayDriversId?: boolean;
  displaySSN?: boolean;
  displayParent1Name?: boolean;
  displayParent2Name?: boolean;
  // this is the primary color theme for the table
  // pretty much any Tailwind UI color
  primaryColor?: string;
  tableName: string;

  constructor(tableName: string, mode: PiSettingsMode) {
    {
      this.tableName = tableName;
      if (mode === PiSettingsMode.Client) {
        this.displayEmail = true;
        this.displayHomePhone = true;
        this.displayCellPhone = true;
        this.displayMinorToggle = false;
        this.displayRelationship = false;
        this.displayHasSpouse = true;
        this.displayRank = false;
        this.displaySpecialNeeds = false;
        this.displayDob = true;
        this.displayExcluded = false;
        this.displayDriversId = true;
        this.displaySSN = true;
        this.displayParent1Name = false;
        this.displayParent2Name = false;
      } else if (mode === PiSettingsMode.Spouse) {
        this.displayEmail = true;
        this.displayHomePhone = true;
        this.displayCellPhone = true;
        this.displayMinorToggle = false;
        this.displayRelationship = false;
        this.displayHasSpouse = false;
        this.displayRank = false;
        this.displaySpecialNeeds = false;
        this.displayDob = true;
        this.displayExcluded = false;
        this.displayDriversId = true;
        this.displaySSN = true;
        this.displayParent1Name = false;
        this.displayParent2Name = false;
      } else if (mode === PiSettingsMode.Child) {
        this.displayEmail = false;
        this.displayHomePhone = false;
        this.displayCellPhone = true;
        this.displayMinorToggle = true;
        this.displayRelationship = false;
        this.displayHasSpouse = false;
        this.displayRank = false;
        this.displaySpecialNeeds = true;
        this.displayDob = true;
        this.displayExcluded = true;
        this.displayDriversId = false;
        this.displaySSN = true;
        this.displayParent1Name = true;
        this.displayParent2Name = true;
      } else if (mode === PiSettingsMode.Family) {
        this.displayEmail = true;
        this.displayHomePhone = false;
        this.displayCellPhone = true;
        this.displayMinorToggle = false;
        this.displayRelationship = true;
        this.displayHasSpouse = false;
        this.displayRank = false;
        this.displaySpecialNeeds = false;
        this.displayDob = false;
        this.displayExcluded = false;
        this.displayDriversId = false;
        this.displaySSN = false;
        this.displayParent1Name = false;
        this.displayParent2Name = false;
      }
      else if (mode === PiSettingsMode.Appointee) {

        this.displayEmail = true;
        this.displayHomePhone = false;
        this.displayCellPhone = true;
        this.displayMinorToggle = false;
        this.displayRelationship = true;
        this.displayHasSpouse = false;
        this.displayRank = false;
        this.displaySpecialNeeds = false;
        this.displayDob = false;
        this.displayExcluded = false;
        this.displayDriversId = false;
        this.displaySSN = false;
        this.displayParent1Name = false;
        this.displayParent2Name = false;
      }
    }
  }
}
