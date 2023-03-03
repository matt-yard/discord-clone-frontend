import "../styles/MemberView.css";

interface MemberViewProps {
  memberList: Member[];
}

const MemberView = (props: MemberViewProps | undefined) => {
  return (
    <div className="flex-column member-list">
      <p id="members-title">
        <strong>Members</strong> <span> - {props?.memberList.length}</span>
      </p>
      {props?.memberList?.map((member: Member) => {
        return (
          <div className="flex-row member-tile">
            <img
              src={member?.user?.profileImage}
              className="profile-img-small"
            />
            <p>{member?.user?.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MemberView;
