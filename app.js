const product = {
  variants: [
    {
      price: 9000,
      values: [
        { type: "Color", name: "Blue", value: "#4597cv" },
        { type: "Size", name: "M", stock: 12 },
        { type: "Material", name: "Iron", stock: 12 },
      ],
    },
    {
      price: 7000,
      values: [
        { type: "Color", name: "Red", value: "#ff0000" },
        { type: "Size", name: "S", stock: 5 },
        { type: "Material", name: "Wooden", stock: 5 },
      ],
    },
    {
      price: 8000,
      values: [
        { type: "Color", name: "Blue", value: "#4597cv" },
        { type: "Size", name: "L", stock: 0 },
        { type: "Material", name: "Plastic", stock: 3 },
      ],
    },
  ],
};

const colorOptionsContainer = document.getElementById("color-options");
const sizeOptionsContainer = document.getElementById("size-options");
const materialOptionsContainer = document.getElementById("material-options");

let selectedColor = null;
let selectedSize = null;
let selectedMaterial = null;

function populateColorOptions() {
  const colors = new Set();
  product.variants.forEach((variant) => {
    variant.values.forEach((value) => {
      if (value.type === "Color") {
        colors.add(value.name);
      }
    });
  });

  colors.forEach((color) => {
    const colorElement = document.createElement("div");
    colorElement.className = "color-option";
    colorElement.style.backgroundColor = product.variants
      .find((v) =>
        v.values.find((val) => val.name === color && val.type === "Color")
      )
      .values.find((val) => val.name === color && val.type === "Color").value;
    colorElement.dataset.color = color;
    colorElement.addEventListener("click", () => {
      selectedColor = color;
      updateSelections();
    });
    colorOptionsContainer.appendChild(colorElement);
  });
}

function populateSizeOptions() {
  sizeOptionsContainer.innerHTML = "";
  const sizes = new Set();
  product.variants.forEach((variant) => {
    variant.values.forEach((value) => {
      if (value.type === "Size") {
        sizes.add(value.name);
      }
    });
  });

  sizes.forEach((size) => {
    const sizeElement = document.createElement("div");
    sizeElement.className = "size-option";
    sizeElement.textContent = size;
    sizeElement.dataset.size = size;
    sizeElement.addEventListener("click", () => {
      if (!sizeElement.classList.contains("disabled")) {
        selectedSize = size;
        updateSelections();
      }
    });
    sizeOptionsContainer.appendChild(sizeElement);
  });
}

function populateMaterialOptions() {
  materialOptionsContainer.innerHTML = "";
  const materials = new Set();
  product.variants.forEach((variant) => {
    variant.values.forEach((value) => {
      if (value.type === "Material") {
        materials.add(value.name);
      }
    });
  });

  materials.forEach((material) => {
    const materialElement = document.createElement("div");
    materialElement.className = "material-option";
    materialElement.textContent = material;
    materialElement.dataset.material = material;
    materialElement.addEventListener("click", () => {
      if (!materialElement.classList.contains("disabled")) {
        selectedMaterial = material;
        updateSelections();
      }
    });
    materialOptionsContainer.appendChild(materialElement);
  });
}

function updateSelections() {
  document
    .querySelectorAll(".color-option")
    .forEach((el) => el.classList.remove("selected"));
  if (selectedColor) {
    document
      .querySelector(`.color-option[data-color="${selectedColor}"]`)
      .classList.add("selected");
  }

  document
    .querySelectorAll(".size-option")
    .forEach((el) => el.classList.remove("selected", "disabled"));
  document
    .querySelectorAll(".material-option")
    .forEach((el) => el.classList.remove("selected", "disabled"));

  if (selectedColor) {
    const sizesAvailable = new Set();
    product.variants.forEach((variant) => {
      if (
        variant.values.some(
          (value) => value.type === "Color" && value.name === selectedColor
        )
      ) {
        variant.values.forEach((value) => {
          if (value.type === "Size") {
            sizesAvailable.add(value.name);
          }
        });
      }
    });

    document.querySelectorAll(".size-option").forEach((el) => {
      if (
        !sizesAvailable.has(el.dataset.size) ||
        (sizesAvailable.has(el.dataset.size) &&
          product.variants.find((v) =>
            v.values.find(
              (val) =>
                val.type === "Color" &&
                val.name === selectedColor &&
                v.values.find(
                  (val) =>
                    val.type === "Size" &&
                    val.name === el.dataset.size &&
                    val.stock === 0
                )
            )
          ))
      ) {
        el.classList.add("disabled");
      }
    });
  }

  if (selectedColor && selectedSize) {
    const materialsAvailable = new Set();
    product.variants.forEach((variant) => {
      if (
        variant.values.some(
          (value) => value.type === "Color" && value.name === selectedColor
        ) &&
        variant.values.some(
          (value) => value.type === "Size" && value.name === selectedSize
        )
      ) {
        variant.values.forEach((value) => {
          if (value.type === "Material") {
            materialsAvailable.add(value.name);
          }
        });
      }
    });

    document.querySelectorAll(".material-option").forEach((el) => {
      if (
        !materialsAvailable.has(el.dataset.material) ||
        (materialsAvailable.has(el.dataset.material) &&
          product.variants.find((v) =>
            v.values.find(
              (val) =>
                val.type === "Color" &&
                val.name === selectedColor &&
                v.values.find(
                  (val) =>
                    val.type === "Size" &&
                    val.name === selectedSize &&
                    v.values.find(
                      (val) =>
                        val.type === "Material" &&
                        val.name === el.dataset.material &&
                        val.stock === 0
                    )
                )
            )
          ))
      ) {
        el.classList.add("disabled");
      }
    });
  }

  if (selectedColor && selectedSize && selectedMaterial) {
    document
      .querySelectorAll(".material-option")
      .forEach((el) => el.classList.remove("selected"));
    document
      .querySelector(`.material-option[data-material="${selectedMaterial}"]`)
      .classList.add("selected");
  }

  if (selectedColor) {
    document
      .querySelector(`.color-option[data-color="${selectedColor}"]`)
      .classList.add("selected");
  }
  if (selectedSize) {
    document
      .querySelector(`.size-option[data-size="${selectedSize}"]`)
      .classList.add("selected");
  }
}

populateColorOptions();
populateSizeOptions();
populateMaterialOptions();
