// This interface is intended to only be used with the UserProfileFormComponent
// it determines the structure of the settings object that is given to it.
// These settings determine what fields will be displayed.
// Essentially for now there are three scenarios: a client, a child and a spouse.
// pass this to the type property as 'CLIENT' 'SPOUSE' OR 'CHILD'
export interface FormSettings {
    // pass 'CLIENT' 'SPOUSE' OR 'CHILD'
    mode : string;

    // these properties overide the default and should be set
    title : string;
    subtitle : string;
    
}