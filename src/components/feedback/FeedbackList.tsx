import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks";

// const initialFeedbackItems = [
//   {
//     id: 1,
//     upvoteCount: 240,
//     badgeLetter: "B",
//     company: "ByteGrad",
//     text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos officia perspiciatis placeat vero consequuntur fuga!",
//     daysAgo: "4",
//   },
// ];
export default function FeedbackList() {
  const context = useFeedbackItemsContext();
  const { filteredFeedbackItems, isLoading, errorMessage } = context;

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {filteredFeedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
