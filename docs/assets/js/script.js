async function loadData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/xuanphao19/VNGeoData/main/src/data/administrativeUnits.json",
    );
    if (!response.ok) throw new Error("Dữ liệu không tải được. Vui lòng kiểm tra lại.");
    const data = await response.json();

    const provinceSelect = document.getElementById("provinceSelect");
    const communeItems = document.getElementById("communeItems");

    // Populate provinces
    data.provinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province.id;
      option.textContent = `${province.name} (${province.type})`;
      provinceSelect.appendChild(option);
    });

    // Handle province selection
    provinceSelect.addEventListener("change", () => {
      const selectedId = provinceSelect.value;
      communeItems.innerHTML = "";

      if (selectedId) {
        const communes = data.communes.filter((c) => c.provinceId === selectedId);
        if (communes.length === 0) {
          communeItems.innerHTML = "<li>Không có xã/phường nào cho tỉnh/thành này.</li>";
          return;
        }
        communes.forEach((commune) => {
          const li = document.createElement("li");
          li.textContent = `${commune.name} (${commune.type})`;
          communeItems.appendChild(li);
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("communeItems").innerHTML = `<li class="text-red-500">${error.message}</li>`;
  }
}

document.addEventListener("DOMContentLoaded", loadData);
