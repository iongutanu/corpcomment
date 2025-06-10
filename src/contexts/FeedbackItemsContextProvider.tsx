import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type TFeedbackItemsContex = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectedCompany: (company: string) => void;
  selectedCompany?: string;
};

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContex | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems();
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index; // Ensure unique company names
        }),
    [feedbackItems]
  );

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (item) =>
              item.company.toLocaleLowerCase() ===
              selectedCompany?.toLocaleLowerCase()
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const newFeedbackItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      // Extracting the company name from the text, assuming it starts with a hashtag
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

    setFeedbackItems((prevItems) => [...prevItems, newFeedbackItem]);
  };

  const handleSelectedCompany = (company: string) => {
    company.toLocaleLowerCase() === selectedCompany?.toLocaleLowerCase()
      ? setSelectedCompany("")
      : setSelectedCompany(company);
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        filteredFeedbackItems,
        companyList,
        errorMessage,
        handleAddToList,
        handleSelectedCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
