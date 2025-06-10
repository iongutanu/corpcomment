import Pattern from "../Pattern";
import PageHeading from "../PageHeading";
import Logo from "../Logo";
import FeedbackForm from "../feedback/FeedbackForm";
import { useFeedbackItemsStore } from "../stores/feedbackItemStore";

export default function Header() {
  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addItemToList} />
    </header>
  );
}
