import ModeToggle from "./Toggle-mode";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="p-4 flex items-center justify-between relative mx-2">
      <aside className="flex items-center gap-2 ">
        <img src="./home.png" alt="" width={30} height={30} />
        <h4 className="sm:text-4xl font-bold text-primary">InvoiceAI</h4>
      </aside>

      <aside className="flex gap-2 items-center">
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
