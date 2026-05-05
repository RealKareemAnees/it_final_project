import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import type { Car } from "../../types/car.interface";
import type { UserInfo } from "../../types/userInfo.interface";
import type { FeedbackItem } from "../../types/feedback.interface";
import { apiFetch } from "../../utils/api.utils";

interface AdminProps {
  user: UserInfo | null;
}

interface CarFormState {
  localID: string;
  name: string;
  manufacturer: string;
  type: string;
  year: string;
  price: string;
  country: string;
  tags: string;
  images: string;
  description: string;
}

interface AdminState {
  cars: Car[];
  users: UserInfo[];
  feedback: FeedbackItem[];
  loading: boolean;
  error: string | null;
  editingCarId: number | null;
  form: CarFormState;
}

const emptyForm: CarFormState = {
  localID: "",
  name: "",
  manufacturer: "",
  type: "",
  year: "",
  price: "",
  country: "",
  tags: "",
  images: "",
  description: "",
};

export class AdminPage extends Component<AdminProps, AdminState> {
  initState(): AdminState {
    return {
      cars: [],
      users: [],
      feedback: [],
      loading: true,
      error: null,
      editingCarId: null,
      form: { ...emptyForm },
    };
  }

  componentDidMount(): void {
    document.title = "Admin Dashboard - CarWiki";
    void this.loadDashboard();
  }

  private async loadDashboard(): Promise<void> {
    this.setState({ loading: true, error: null });
    try {
      const [cars, users, feedback] = await Promise.all([
        apiFetch<{ cars: Car[] }>("/api/cars/all"),
        apiFetch<{ users: UserInfo[] }>("/api/users/all"),
        apiFetch<{ feedback: FeedbackItem[] }>("/api/admin/feedback"),
      ]);
      this.setState({
        cars: cars.cars,
        users: users.users,
        feedback: feedback.feedback,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load dashboard.";
      this.setState({ error: message, loading: false });
    }
  }

  private setFormValue<K extends keyof CarFormState>(
    key: K,
    value: CarFormState[K],
  ): void {
    this.setState((prev) => ({ form: { ...prev.form, [key]: value } }));
  }

  private editCar(car: Car): void {
    this.setState({
      editingCarId: car.localID,
      form: {
        localID: String(car.localID),
        name: car.name,
        manufacturer: car.manufacturer,
        type: car.type,
        year: String(car.year),
        price: String(car.price),
        country: car.country,
        tags: car.tags.join(", "),
        images: car.images.join(", "),
        description: car.description,
      },
    });
  }

  private resetForm(): void {
    this.setState({ editingCarId: null, form: { ...emptyForm } });
  }

  private async saveCar(event: Event): Promise<void> {
    event.preventDefault();
    const { form, editingCarId } = this.state;
    if (!form.name || !form.manufacturer || !form.localID) {
      this.setState({ error: "Name, manufacturer, and ID are required." });
      return;
    }

    const payload = {
      localID: Number(form.localID),
      name: form.name,
      manufacturer: form.manufacturer,
      type: form.type,
      year: Number(form.year),
      price: Number(form.price),
      country: form.country,
      tags: form.tags
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      images: form.images
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      description: form.description,
    };

    try {
      if (editingCarId) {
        await apiFetch("/api/cars/update", {
          method: "POST",
          body: JSON.stringify({ id: editingCarId, ...payload }),
        });
      } else {
        await apiFetch("/api/cars/add", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      this.resetForm();
      await this.loadDashboard();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save car.";
      this.setState({ error: message });
    }
  }

  private async deleteCar(car: Car): Promise<void> {
    try {
      await apiFetch("/api/cars/delete", {
        method: "POST",
        body: JSON.stringify({ id: car.localID }),
      });
      await this.loadDashboard();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete car.";
      this.setState({ error: message });
    }
  }

  private async deleteUser(user: UserInfo): Promise<void> {
    try {
      await apiFetch("/api/users/delete", {
        method: "POST",
        body: JSON.stringify({ username: user.username }),
      });
      await this.loadDashboard();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete user.";
      this.setState({ error: message });
    }
  }

  render(): VNode {
    const { cars, users, feedback, loading, error, form, editingCarId } =
      this.state;
    const summary = [
      { label: "Cars", value: cars.length },
      { label: "Users", value: users.length },
      { label: "Feedback", value: feedback.length },
    ];

    return h(
      "div",
      { className: "page-section admin-page" },
      h(
        "div",
        { className: "page-header admin-header" },
        h("span", { className: "page-eyebrow" }, "Admin"),
        h("h1", null, "Dashboard"),
        h("p", null, "Manage cars, users, and feedback."),
      ),
      error ? h("p", { className: "page-error" }, error) : null,
      loading ? h("p", { className: "page-note" }, "Loading...") : null,
      h(
        "section",
        { className: "admin-summary" },
        summary.map((item) =>
          h(
            "div",
            { className: "admin-summary-card", key: item.label },
            h("span", null, item.label),
            h("strong", null, String(item.value)),
          ),
        ),
      ),
      h(
        "section",
        { className: "admin-panel" },
        h("h2", null, editingCarId ? "Edit Car" : "Add Car"),
        h(
          "form",
          {
            className: "admin-form",
            onSubmit: (event: Event) => void this.saveCar(event),
          },
          h(
            "div",
            { className: "field-grid" },
            h("input", {
              placeholder: "ID",
              value: form.localID,
              onInput: (event: InputEvent) =>
                this.setFormValue(
                  "localID",
                  (event.target as HTMLInputElement).value,
                ),
            }),
            h("input", {
              placeholder: "Name",
              value: form.name,
              onInput: (event: InputEvent) =>
                this.setFormValue(
                  "name",
                  (event.target as HTMLInputElement).value,
                ),
            }),
            h("input", {
              placeholder: "Manufacturer",
              value: form.manufacturer,
              onInput: (event: InputEvent) =>
                this.setFormValue(
                  "manufacturer",
                  (event.target as HTMLInputElement).value,
                ),
            }),
            h("input", {
              placeholder: "Type",
              value: form.type,
              onInput: (event: InputEvent) =>
                this.setFormValue(
                  "type",
                  (event.target as HTMLInputElement).value,
                ),
            }),
            h("input", {
              placeholder: "Year",
              value: form.year,
              onInput: (event: InputEvent) =>
                this.setFormValue(
                  "year",
                  (event.target as HTMLInputElement).value,
                ),
            }),
            h("input", {
              placeholder: "Price",
              value: form.price,
              onInput: (event: InputEvent) =>
                this.setFormValue(
                  "price",
                  (event.target as HTMLInputElement).value,
                ),
            }),
            h("input", {
              placeholder: "Country",
              value: form.country,
              onInput: (event: InputEvent) =>
                this.setFormValue(
                  "country",
                  (event.target as HTMLInputElement).value,
                ),
            }),
          ),
          h("textarea", {
            placeholder: "Description",
            rows: 3,
            value: form.description,
            onInput: (event: InputEvent) =>
              this.setFormValue(
                "description",
                (event.target as HTMLTextAreaElement).value,
              ),
          }),
          h("input", {
            placeholder: "Images (comma separated URLs)",
            value: form.images,
            onInput: (event: InputEvent) =>
              this.setFormValue(
                "images",
                (event.target as HTMLInputElement).value,
              ),
          }),
          h("input", {
            placeholder: "Tags (comma separated)",
            value: form.tags,
            onInput: (event: InputEvent) =>
              this.setFormValue(
                "tags",
                (event.target as HTMLInputElement).value,
              ),
          }),
          h(
            "div",
            { className: "form-actions" },
            h(
              "button",
              { type: "submit", className: "primary-button" },
              editingCarId ? "Update Car" : "Add Car",
            ),
            editingCarId
              ? h(
                  "button",
                  {
                    type: "button",
                    className: "secondary-button",
                    onClick: () => this.resetForm(),
                  },
                  "Cancel",
                )
              : null,
          ),
        ),
      ),
      h(
        "section",
        { className: "admin-panel" },
        h("h2", null, "Cars"),
        h(
          "div",
          { className: "admin-list" },
          cars.map((car) =>
            h(
              "div",
              { className: "admin-item", key: car.localID },
              h(
                "div",
                { className: "admin-item-main" },
                h("strong", null, car.name),
                h("span", null, `${car.manufacturer} · ${car.year}`),
              ),
              h(
                "div",
                { className: "admin-item-actions" },
                h(
                  "button",
                  {
                    className: "secondary-button",
                    onClick: () => this.editCar(car),
                  },
                  "Edit",
                ),
                h(
                  "button",
                  {
                    className: "ghost-button",
                    onClick: () => void this.deleteCar(car),
                  },
                  "Delete",
                ),
              ),
            ),
          ),
        ),
      ),
      h(
        "section",
        { className: "admin-panel" },
        h("h2", null, "Users"),
        h(
          "div",
          { className: "admin-list" },
          users.map((user) =>
            h(
              "div",
              { className: "admin-item", key: user.username },
              h(
                "div",
                { className: "admin-item-main" },
                h("strong", null, user.username || "Unknown"),
                h("span", null, user.role || "user"),
              ),
              h(
                "div",
                { className: "admin-item-actions" },
                user.role !== "admin"
                  ? h(
                      "button",
                      {
                        className: "ghost-button",
                        onClick: () => void this.deleteUser(user),
                      },
                      "Delete",
                    )
                  : h("span", { className: "admin-tag" }, "Admin"),
              ),
            ),
          ),
        ),
      ),
      h(
        "section",
        { className: "admin-panel" },
        h("h2", null, "Feedback"),
        h(
          "div",
          { className: "admin-list" },
          feedback.map((item, index) =>
            h(
              "div",
              { className: "admin-item", key: `${item.email}-${index}` },
              h(
                "div",
                { className: "admin-item-main" },
                h("strong", null, item.name),
                h("span", null, item.email),
              ),
              h("p", { className: "admin-note" }, item.message),
            ),
          ),
        ),
      ),
    );
  }
}
