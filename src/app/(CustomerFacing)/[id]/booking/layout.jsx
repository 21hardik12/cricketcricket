import Header from "@/app/_CustomerFacing/_components/Header";

export default function BookingLayout({
  children,
}) {
  return (
    <>
      <Header></Header>
      <div className="container my-6">{children}</div>      
    </>
  );
}
