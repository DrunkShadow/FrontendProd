import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MaterielleService {
  private baseUrl = "http://127.0.0.1:8000/materielle";

  constructor() {}

  getMaterielle() {
    return fetch(this.baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  deleteMaterielle(reference: string) {
    return fetch(`${this.baseUrl}/${reference}`, {
      method: "DELETE",
    }).then((response) => {
      console.log("Model Deleted successfully:", response);
    });
  }

  getMaterielleById(idMaterielle: string) {
    return fetch(`${this.baseUrl}/${idMaterielle}`).then((response) =>
      response.json()
    );
  }
  addMaterielle(
    reference: string,
    title: string,
    description: string,
    price: string,
    date: string,
    category: string
  ) {
    return fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: reference,
        titre: title,
        description: description,
        categorie: category,
        prix: price,
        date: date
      }),
    });
  }
}
