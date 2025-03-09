import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const Eventcard: React.FC<CardProps> = ({ title, imageUrl, link }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <Image
        src={imageUrl}
        alt={title}
        width={320}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <Link href={link}>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            View All Images
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Eventcard;
