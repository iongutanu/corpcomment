import { useFeedbackItemsContext } from "../../lib/hooks";
import HashTagItem from "./HashTagItem";

export default function HashtagList() {
  console.log("HashtagList rendered");
  const { companyList, handleSelectedCompany } = useFeedbackItemsContext();

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          onSelectCompany={handleSelectedCompany}
        />
      ))}
    </ul>
  );
}
