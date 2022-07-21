interface AccountProps {
  avatar: string;
  name: string;
  email: string;
}

export function Account({ avatar, name, email }: AccountProps) {
  return (
    <div className="flex">
      <img src={avatar} className="flex-none rounded-full w-9 h-9" />

      <div className="ml-2">
        <h5 className="font-semibold text-sm">{name}</h5>
        <div className="text-gray-400 text-xs">{email}</div>
      </div>
    </div>
  );
}
