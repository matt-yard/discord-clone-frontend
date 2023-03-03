//this type is broken

interface MemberViewProps {
  memberList: Member & {
    user: User;
  };
}

const MemberView = (props: MemberViewProps | undefined) => {
  console.log(props?.memberList);
  return (
    <div>
      <p>members</p>
      {props?.memberList?.map((member: any) => {
        return <p>{member?.user?.username}</p>;
      })}
    </div>
  );
};

export default MemberView;
