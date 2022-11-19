import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  value: String;
  sport: Array<any>;
  art: Array<any>;
  role = "viseur";

  constructor(public userService: UserService, private router: Router) {
    (this.sport = [
      { sport: "Football" },
      { sport: "Handball" },
      { sport: "Basketball" },
      { sport: "Volleyball" },
    ]),
      (this.art = [
        { art: "chanteur" },
        { art: "Danceur" },
        { art: "Musicien" },
        { art: "Acteur" },
      ]);
  }

  ngOnInit(): void {
    this.value = "sport";
  }

  onSubmit(form: NgForm) {
    form.form.value.role = this.role;

    let details = {
      ...form.value,
      talent: {
        category: form.value.category,
        speciality: form.value.speciality,
      },
    };

    this.userService.saveUser(details).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.resetForm(form);
        this.router.navigate(["/examples/login"]);
        Swal.fire({
          icon: 'success',
          title: 'votre Inscription a été effectuée avec succès',
          showConfirmButton: false,
          timer: 3000
        })
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join("<br/>");
          alert("Bad request");
        } else
          this.serverErrorMessages =
            "Something went wrong.Please contact admin.";
        alert("Something went wrong.Please contact admin.");
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.serverErrorMessages = "";
  }

  radioChange(event: any) {
    this.value = event.target.value;
  }
  selectRole(i: number) {
    this.role = i == 1 ? "viseur" : "talent";
  }
}
