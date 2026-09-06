type FeatureListProps = {
  icon: string;
  text: string;
};

export default function FeatureList({ icon, text }: FeatureListProps) {
  return (
    <li className="flex items-center gap-4">
      <div className="w-14 h-14 bg-dark-blue rounded-2xl flex items-center justify-center">
        <img alt={text} className="w-8 h-8 object-contain" src={icon} />
      </div>
      <span className="text-lg">{text}</span>
    </li>
  );
}
