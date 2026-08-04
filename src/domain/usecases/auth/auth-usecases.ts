import axios from "axios";

import {env} from "@/env";

export async function userIsAssociadoAndBookSeller(userId: string, token: string) {
  try {
    const { data } = await axios.get(
      `${env.AUTH_SERVICE_URL}/auth/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User data:", data.user);
    return (
      data.user.userType === "associado" &&
      data.user.roles?.some((role: any) => role.nome === "bookSeller")
    );
  } catch (error: any) {
    console.error(
      "Erro ao verificar permissões:",
      error.response?.data || error
    );
    return false;
  }
}

export async function userIsAssociado(userId: string, token: string) {
  try {
    console.log(userId, token);
    const { data } = await axios.get(
      `${env.AUTH_SERVICE_URL}/auth/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User data:", data.user);
    return data.user.userType === "associado" || data.user.userType === "admin";
  } catch (error: any) {
    console.error(
      "Erro ao verificar permissões:",
      error.response?.data || error
    );
    return false;
  }
}

export async function isUser(userId: string, token: string) {
  try {
    const { data: user } = await axios.get(
      `${env.AUTH_SERVICE_URL}/auth/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return user || false;
  } catch (error: any) {
    console.error(
      "Erro ao verificar permissões:",
      error.response?.data || error
    );
    return false;
  }
}

export async function assignRoleToUser(userId: string, roleId: string, token: string) {
  try {
    const response = await axios.post(
      `${env.AUTH_SERVICE_URL}/auth/users/${userId}/roles`,
      { roleId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // retorno da rota
  } catch (error: any) {
    console.error(
      "Erro ao atribuir role ao utilizador:",
      error.response?.data || error
    );
    throw new Error("Falha ao comunicar com Auth Service");
  }
}
export async function findRoleByName(nome: string, token: string) {
  try {
    const response = await axios.post(
      `${env.AUTH_SERVICE_URL}/auth/role/${nome}/`,
      { nome },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // retorno da rota
  } catch (error: any) {
    console.error(
      "Erro ao atribuir role ao utilizador:",
      error.response?.data || error
    );
    throw new Error("Falha ao comunicar com Auth Service");
  }
}
