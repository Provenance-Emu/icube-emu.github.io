import TestFlightGate from "@/components/TestFlightGate";

export const metadata = {
  title: "Join TestFlight | iCube",
  description: "Access the iCube TestFlight build.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestFlightPage() {
  return <TestFlightGate />;
}
