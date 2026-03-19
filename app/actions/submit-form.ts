"use server"

export async function submitForm(formData: FormData, origem: string) {
  try {
    // Endpoint do Google Apps Script que grava na planilha
    const MAKE_WEBHOOK_URL =
      process.env.MAKE_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwfB1c4WgkBlYaF2VSvC4tGq1iITEqZnl4h71kOZXjcYyOCWiseLdv3RP2ciA_3gIOW/exec"

    const payload = {
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      email: formData.get("email"),
      origem: origem,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`)
    }

    return { success: true, message: "Dados enviados com sucesso!" }
  } catch (error) {
    console.error("Erro ao enviar dados:", error)
    return { success: false, message: "Erro ao enviar. Tente novamente." }
  }
}
