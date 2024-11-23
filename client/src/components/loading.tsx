

type Props = {
  info: string;
};

const Loading = ({ info }: Props) => {
  return (
    <tr>
      <td colSpan={3} className="px-6 py-16">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">{info}</p>
        </div>
      </td>
    </tr>
  );
};

export default Loading;
