import { Like } from "../../shared/models/Like.model";
import { Share } from "../../shared/models/share.model";

export enum NewsStatus {
  Draft = "draft",
  Published = "published"
}

export enum NewsCategory {
  Environmental = "environmental",
  Government = "government",
  Politics = "politics",
  ReligionAndSpirituality = "religion",
  Sports = "sports",
  Technology = "technology",
  Weather = "weather",
  Other = "other"
}

export enum NewsRegion {
  LocalNews = "local",
  StateLevel = "state",
  National = "national"
}

export interface News {
  id?: string;
  headline: string;
  content: string;
  newsPostedByEmail: string;
  newsPostedByName: string;
  newsPostedOn: Date;
  newsCreatedOn: Date;
  newsStatus: NewsStatus.Draft | NewsStatus.Published;
  newsCategory:
    | NewsCategory.Environmental
    | NewsCategory.Government
    | NewsCategory.Other
    | NewsCategory.Politics
    | NewsCategory.ReligionAndSpirituality
    | NewsCategory.Sports
    | NewsCategory.Technology
    | NewsCategory.Weather;
  newsSource: string;
  newsRegion: NewsRegion.LocalNews | NewsRegion.National | NewsRegion.StateLevel;
  imagePath: string[];
  videoUrl: string;
  isDeleted: boolean;
  comments: Comment[];
  commentsCount: number;
  likes: Like[];
  likesCounts: number;
  shared: Share[];
  shareCount: number;
}
