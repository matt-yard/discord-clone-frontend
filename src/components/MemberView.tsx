//this type is broken

interface MemberViewProps {
  memberList: Member & {
    user: User;
  };
}

const MemberView = (props: MemberViewProps | undefined) => {
  return <div>members</div>;
};

export default MemberView;
