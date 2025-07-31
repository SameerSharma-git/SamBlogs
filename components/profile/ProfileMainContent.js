// components/profile/ProfileMainContent.jsx
import React, {useState} from 'react';
import DashboardView from './main-content/DashboardView';
import UpdateProfileForm from './main-content/UpdateProfileForm';
import AddNewBlogForm from './main-content/AddNewBlogForm';
import YourBlogsList from './main-content/YourBlogsList';
import UserSettings from './main-content/UserSettings';
import ModalComponent from '../ModalComponent';

export default function ProfileMainContent({ user, selectedView, isMobileMenuOpen, setSelectedView }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null)
  const [title, setTitle] = useState("Title")

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Helper function to format dates - passed down to relevant components
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  // Determine which component to render based on selectedView
  const renderContent = () => {
    switch (selectedView) {
      case 'dashboard':
        return <DashboardView user={user} formatDate={formatDate} setSelectedView={setSelectedView} handleOpenModal={handleOpenModal} setModalData={setModalData} setTitle={setTitle} />;
      case 'update-profile':
        return <UpdateProfileForm user={user} />;
      case 'add-blog':
        return <AddNewBlogForm user={user} />;
      case 'your-blogs':
        return <YourBlogsList user={user} formatDate={formatDate} setSelectedView={setSelectedView} />;
      case 'settings':
        return <UserSettings user={user} setSelectedView={setSelectedView} />; // Pass setSelectedView to UserSettings
      default:
        return <DashboardView user={user} formatDate={formatDate} setSelectedView={setSelectedView} />; // Fallback
    }
  };

  return (
    <section
      className={`
        flex-1 p-6 md:p-8 dashboard-panel-bg 
        rounded-lg
        shadow-xl md:shadow-2xl
        ${isMobileMenuOpen ? 'hidden' : 'flex'} md:flex flex-col
        border-2 border-tertiary
        md:ml-[-2px]
        h-full
        animate-fade-in
        overflow-y-auto
      `}
    >

      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        modalData={modalData}
      ></ModalComponent>

      <div className="flex-1">
        {renderContent()}
      </div>
    </section>
  );
}
