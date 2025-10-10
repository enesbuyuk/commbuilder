import Link from "next/link";
import Image from "next/image";

const MemberCard = ({ name, title, email }: { name: string, title: string, email: string }) => (
    <div className="bg-white flex items-center border border-gray-200 p-4 rounded-lg shadow-md w-80">
        <Image alt={name} className="w-16 h-16 bg-gray-100 object-cover rounded-full mr-4" src={`${process.env.NEXT_PUBLIC_BUCKET}/theme/default-profile-photo.png`} width={64} height={64} />
        <div>
            <h2 className="text-gray-900 font-semibold">{name}</h2>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-gray-500 text-sm">
                <Link href={`mailto:${email}`} className="text-primary hover:text-secondary">{email}</Link>
            </p>
        </div>
    </div>
);

export default MemberCard;
