const AuthLayout = ({
    children
}:  {
    children: React.ReactNode}) => {
    return (  
        <div className="h-full flex items-center justify-center
         bg-gradient-to-b from-purple-400 to-purple-800">
            {children}
        </div>
    );
}
 
export default AuthLayout;