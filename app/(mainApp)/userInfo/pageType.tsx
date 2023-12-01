export type UserInfo = {
  displayName: string;
  contactInfo?: { contactName: string; contact: string }[];
  location?: string;
  links?: { linkName: string; link: string }[];
  email: string; //used to identify user
};
