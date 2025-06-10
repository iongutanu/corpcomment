import { create } from "zustand";
import { TFeedbackItem } from "../../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  fetchFeedbackItems: () => Promise<void>;
  filteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((feedbackItem) => feedbackItem.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  filteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) =>
            feedbackItem.company.toLocaleLowerCase() ===
            state.selectedCompany?.toLocaleLowerCase()
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const newFeedbackItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0,
    };

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newFeedbackItem),
      }
    );

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newFeedbackItem],
    }));
  },
  selectCompany: (company: string) => {
    set((state) => {
      const curentCompany = state.selectedCompany.trim().toLocaleLowerCase();
      return curentCompany &&
        curentCompany === company.trim().toLocaleLowerCase()
        ? {
            selectedCompany: "",
          }
        : {
            selectedCompany: company,
          };
    });
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set(() => ({
        feedbackItems: data.feedbacks,
        isLoading: false,
        errorMessage: "",
      }));
    } catch (error) {
      set(() => ({
        feedbackItems: [],
        isLoading: false,
        errorMessage: "An error occurred while fetching feedback items",
      }));
    }
  },
}));
