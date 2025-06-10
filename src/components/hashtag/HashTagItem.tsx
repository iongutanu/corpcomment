type THashtagItemProps = {
  company: string;
  onSelectCompany: (company: string) => void;
};

export default function HashTagItem({
  company,
  onSelectCompany,
}: THashtagItemProps) {
  return (
    <li key={company}>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
