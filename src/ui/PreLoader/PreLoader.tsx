import scss from "./PreLoader.module.scss";

const PreLoader = () => {
  return (
    <div className={scss.spiner}>
      <span className={scss.loader}></span>
    </div>
  );
};

export default PreLoader;
