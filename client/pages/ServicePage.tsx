import { Navigate, useParams } from 'react-router-dom';
import ServicePageView from '@/components/services/ServicePageView';
import { getServicePage, type ServicePageSlug, servicePagesRecord } from '@/data/servicePages';

function isServiceSlug(slug: string): slug is ServicePageSlug {
  return slug in servicePagesRecord;
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !isServiceSlug(slug)) {
    return <Navigate to="/" replace />;
  }

  const config = getServicePage(slug);
  return <ServicePageView config={config} />;
}
