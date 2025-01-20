import Plans from "@/components/Pages/Plans";
import Layout from "../components/common/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function HomePage() {
  return (
    <ProtectedRoute>
    <Layout>
      <Plans />
    </Layout>
    </ProtectedRoute>
  );
}
