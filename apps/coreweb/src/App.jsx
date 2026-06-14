import CoreWebHeader from './CoreWebHeader';
import CoreWebHome from './CoreWebHome';
import CoreWebFooter from './CoreWebFooter';

export default function App() {
  return (
    <div className="coreweb-theme">
      <CoreWebHeader />
      <CoreWebHome />
      <CoreWebFooter />
    </div>
  );
}
