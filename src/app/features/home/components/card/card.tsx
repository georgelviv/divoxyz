interface CardProps {
  title: string;
}

const Card = ({ title }: CardProps) => {
  return <div className="p-5">{title}</div>;
};

export default Card;
