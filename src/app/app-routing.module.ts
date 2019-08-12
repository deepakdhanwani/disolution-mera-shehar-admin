import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./auth/signup/signup.module").then(m => m.SignupPageModule)
  },
  {
    path: "news",
    loadChildren: "./news/news.module#NewsPageModule",
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
