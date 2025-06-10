import { useEffect, useState } from "react";
import { TFeedbackItem } from "./types";

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // .then way

    // setIsLoading(true);
    // fetch(
    //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error();
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setFeedbackItems(data["feedbacks"]);
    //     setIsLoading(false);
    //     setErrorMessage("");
    //   })
    //   .catch(() => {
    //     setErrorMessage("An error occurred while fetching feedback items");
    //     console.error("Fetch error: " + errorMessage);
    //     setFeedbackItems([]);
    //     setIsLoading(false);
    //   });

    // async - await way

    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data["feedbacks"]);
        setIsLoading(false);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("An error occurred while fetching feedback items");
        setFeedbackItems([]);
        setIsLoading(false);
      }
    };

    fetchFeedbackItems();
  }, []);

  return {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
  };
}
