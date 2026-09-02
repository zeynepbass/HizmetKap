export function LoginImage() {
    return (
      <div className="col-span-12 md:col-span-6 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/login.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    );
  }