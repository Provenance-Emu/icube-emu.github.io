import TestFlightGate from "@/components/TestFlightGate";

export const metadata = {
  title: "TestFlight Beta",
  description: "Join the iCube TestFlight beta program to try the latest builds of the GameCube & Wii emulator for iOS and tvOS before public release.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestFlightPage() {
  return <TestFlightGate />;
}
