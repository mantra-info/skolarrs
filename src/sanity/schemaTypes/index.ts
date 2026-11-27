import { event, faq, partner, post, service, testimonial } from "./content";
import { country } from "./country";
import { courseCategory } from "./courseCategory";
import { homePage } from "./homePage";
import { mbbsDestination } from "./mbbsDestination";
import { objects } from "./objects";
import { siteSettings } from "./siteSettings";
import { university } from "./university";

export const SINGLETONS = ["siteSettings", "homePage"];

export const schemaTypes = [
  ...objects,
  homePage,
  university,
  country,
  courseCategory,
  mbbsDestination,
  service,
  testimonial,
  event,
  post,
  faq,
  partner,
  siteSettings,
];
