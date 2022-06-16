export const theme = (userRole: string, type: string, meta: any = {}) => {
  if (type === "dashboard") {
    if(userRole === "administrator") {
      return "bg-lh-dark"
    } 
    else {
      return "bg-lh-primary"
    }
  }
  else if(type === "nav-link") {
    if(userRole === "administrator") {
      return meta.isActive ? " bg-lh-dark text-lh-light" :
      " bg-lh-gray text-lh-dark"
    } 
    else {
      return meta.isActive ? " bg-lh-primary text-lh-light" :
      " bg-lh-gray text-lh-dark"
    }
  }
};
export const roleList = ["Développeur", "Project Manager", "Administrateur"]
export const titleByRole = (userRole: string) => {
  const dashboardTitle: any = {
    dev: "Dashboard",
    product_owner: "Dashboard Manager",
    administrator: "Admin Dashboard",
  };
  return dashboardTitle[userRole]
};
