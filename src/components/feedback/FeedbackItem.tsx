import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItemType } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = { feedbackItem: TFeedbackItemType };

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUpvoteCount((prev) => ++prev);
    e.currentTarget.disabled = true;
    e.stopPropagation();

    const updatedFeedbackItem = {
      ...feedbackItem,
      upvoteCount: feedbackItem.upvoteCount + 1,
    };

    // await fetch(
    //   `https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks/${feedbackItem.id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify(updatedFeedbackItem),
    //   }
    // );
  };

  return (
    <li
      className={`feedback ${open ? "feedback--expand" : ""}`}
      onClick={handleClick}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo === 0 ? "New" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
