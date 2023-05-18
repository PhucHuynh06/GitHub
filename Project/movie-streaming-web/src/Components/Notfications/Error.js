export const InlineError = ({ text, className }) => {
    return (
      <div className={`text-subMain w-full mt-2 text-xs font-medium ${className}`}>
        <p>{text}</p>
      </div>
    );
  };