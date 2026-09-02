export function Heading({
  title,
  desc,
  onClick,
  className = "",
  variant = "login",
}) {
  const variants = {
    login: {
      title: "text-lg text-center text-gray-400",
      desc: "text-gray-400 text-center text-sm",
    },

    dark: {
      title: "text-3xl font-bold p-4 text-center text-gray-400",
      desc: "text-gray-500 text-center",
    },
  };

  const styles = variants[variant] || variants.login;

  return (
    <div>
      <h1
        className={`${styles.title} ${className}`}
        onClick={onClick}
      >
        {title}
      </h1>

      <p className={styles.desc}>
        {desc}
      </p>
    </div>
  );
}