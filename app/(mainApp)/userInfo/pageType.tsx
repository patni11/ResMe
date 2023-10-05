export type UserInfo = {
  displayName: string;
  contactInfo?: { contact: string }[];
  location?: string;
  links?: { linkName: string; link: string }[];
  id: string;
};
