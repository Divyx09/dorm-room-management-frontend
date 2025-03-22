import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="root-layout">
      {/* Add your header, navigation, etc. here */}
      <main>
        <Outlet />
      </main>
      {/* Add your footer here */}
    </div>
  );
};

export default RootLayout;