import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import { Status } from "../../../common/type";
import { Kir } from "../../../feature/kir/kir";
import { LiveDateTime } from "../../component/LiveDateTime";
import { Spinner } from "../../component/Spinner";
import {
  KirCard,
  KirCardImage,
  KirCardItem,
  KirCardItemHeading,
  KirSection,
} from "./KirComponent";
import { useKirApi } from "./KirHook";
import { server } from "../../../common/config";

export function FindKir() {
  const kirApi = useKirApi();
  const { certificateNumber } = useParams();

  useEffect(() => {
    if (kirApi.state.status == Status.idle && kirApi.state.data == undefined) {
      kirApi.find(certificateNumber!);
    }

    console.log(kirApi.state);
  }, [kirApi.state]);

  return (
    <>
      <div className="min-h-screen flex flex-col pb-6 bg-gray-100">
        <div className="bg-blue-900 p-4 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-8" />
            <div className="text-white font-semibold text-lg">
              KEMENTERIAN PERHUBUNGAN
            </div>
          </div>
          <LiveDateTime className="bg-white text-gray-700 w-40 text-center font-semibold py-1 text-xs rounded-full" />
        </div>

        {(() => {
          if (
            kirApi.state.action == "find" &&
            kirApi.state.status == Status.complete &&
            kirApi.state.data != undefined
          ) {
            const data = kirApi.state.data as Kir;

            return (
              <>
                <div>
                  <div>
                    <div className="p-6 text-center text-2xl space-y-2 text-gray-600">
                      <div>UJI BERKALA KENDARAAN BERMOTOR</div>
                      {(() => {
                        const today = dayjs();
                        const expiryDate = dayjs(data.expiryDate);
                        const isValid = today.isBefore(expiryDate);

                        if (isValid) {
                          return (
                            <div className="text-green-500 font-semibold">
                              Hasil Uji Masih Berlaku
                            </div>
                          );
                        } else {
                          return (
                            <div className="text-red-500 font-semibold">
                              Hasil Uji Tidak Berlaku
                            </div>
                          );
                        }
                      })()}
                      <div>
                        Masa Berlaku Hasil Uji:{" "}
                        {dayjs(data.expiryDate)
                          .locale("id")
                          .format("DD MMMM YYYY")}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <KirSection>
                        <KirCard title="IDENTITAS PEMILIK KENDARAAN DAN BLUe">
                          <KirCardItem
                            title="Nama Pemilik"
                            value={data.owner}
                          />
                          <KirCardItem
                            title="Alamat Pemilik"
                            value={data.address}
                          />
                          <KirCardItemHeading title="Identitas BLUe" />
                          <KirCardItem
                            title="Nomor Kartu"
                            value={data.cardNumber}
                          />
                          <KirCardItem title="Nomor RFID" value={data.rfid} />
                        </KirCard>
                        <KirCard title="IDENTITAS KENDARAAN BERMOTOR">
                          <KirCardItem
                            title="Nomor Uji Kendaraan"
                            value={data.inspectionNumber}
                          />
                          <KirCardItem
                            title="Nomor dan Tanggal SRUT"
                            value={data.registrationDate}
                          />
                          <KirCardItem
                            title="Nomor Registrasi Kendaraan"
                            value={data.registrationNumber}
                          />
                          <KirCardItem
                            title="Nomor Rangka Kendaraan"
                            value={data.chasisNumber}
                          />
                          <KirCardItem
                            title="Nomor Motor Penggerak"
                            value={data.engineNumber}
                          />
                        </KirCard>
                      </KirSection>

                      <div className="px-4 space-y-2">
                        <div className="font-semibold text-[14px] lg:text-[16px]">
                          FOTO KENDARAAN
                        </div>
                        <div className="flex flex-col gap-2 justify-between lg:gap-6 lg:flex-row">
                          <KirCardImage
                            title="TAMPAK DEPAN"
                            value={`${server}/${data.frontPic}`}
                          />
                          <KirCardImage
                            title="TAMPAK BELAKANG"
                            value={`${server}/${data.backPic}`}
                          />
                          <KirCardImage
                            title="TAMPAK KIRI"
                            value={`${server}/${data.leftPic}`}
                          />
                          <KirCardImage
                            title="TAMPAK KANAN"
                            value={`${server}/${data.rightPic}`}
                          />
                        </div>
                      </div>

                      <KirSection>
                        <KirCard title="SPESIFIKASI TEKNIS KENDARAAN BERMOTOR">
                          <KirCardItem
                            title="Jenis Kendaraan"
                            value={data.vehicleType}
                          />
                          <KirCardItem
                            title="Merk/Tipe Kendaraan"
                            value={data.vehicleBrand}
                          />
                          <KirCardItem
                            title="Tahun Pembuatan/Perakitan"
                            value={data.yearManufacture}
                          />
                          <KirCardItem
                            title="Bahan Bakar / Sumber Energi"
                            value={data.fuel}
                          />
                          <KirCardItem
                            title="Isi Silinder"
                            value={data.engineCapacity}
                          />
                          <KirCardItem
                            title="Daya Motor"
                            value={data.enginePower}
                          />
                          <KirCardItem
                            title="Ukuran Ban"
                            value={data.tyreSize}
                          />
                          <KirCardItem
                            title="Konfigurasi Sumbu"
                            value={data.axleConfiguration}
                          />
                          <KirCardItem
                            title="Berat Kosong Kendaraan"
                            value={data.curbWeight}
                          />
                          <KirCardItemHeading title="Dimensi utama kendaraan bermotor" />
                          <KirCardItem title="Panjang" value={data.length} />
                          <KirCardItem title="Lebar" value={data.width} />
                          <KirCardItem title="Tinggi" value={data.height} />
                          <KirCardItem title="Julur Depan" value={data.front} />
                          <KirCardItem
                            title="Julur Belakang"
                            value={data.back}
                          />
                          <KirCardItemHeading title="Jarak Sumbu" />
                          <KirCardItem title="Sumbu I-II" value={data.sumbu1} />
                          <KirCardItem
                            title="Sumbu II-III"
                            value={data.sumbu2}
                          />
                          <KirCardItem
                            title="Sumbu III-IV"
                            value={data.sumbu3}
                          />
                          <KirCardItemHeading title="Dimensi bak muatan/tangki" />
                          <KirCardItem
                            title="Panjang x Lebar x Tinggi"
                            value={data.dimension}
                          />
                          <KirCardItem title="JBB/JBKB" value={data.jbbJbkb} />
                          <KirCardItem title="JBI/JBKI" value={data.jbiJbki} />
                          <KirCardItem
                            title="Daya Angkut(orang/kg)"
                            value={data.payload}
                          />
                          <KirCardItem
                            title="Kelas jalan terendah yang boleh dilalui"
                            value={data.classPermit}
                          />
                          <KirCardItem title="MST" value={data.mst} />
                        </KirCard>
                        <div className="flex flex-col w-full space-y-2">
                          <KirCard title="RINCIAN HASIL UJI">
                            <KirCardItemHeading title="Hasil Uji Rem" />
                            <KirCardItem
                              title="Rem Utama"
                              value={data.brake1}
                            />
                            <KirCardItem
                              title="Rem Utama Sumbu I"
                              value={data.brake2}
                            />
                            <KirCardItem
                              title="Rem Utama Sumbu II"
                              value={data.brake3}
                            />
                            <KirCardItem
                              title="Rem Utama Sumbu III"
                              value={data.brake4}
                            />
                            <KirCardItem
                              title="Rem Utama Sumbu IV"
                              value={data.brake5}
                            />
                            <KirCardItemHeading title="Hasil Uji Lampu" />
                            <KirCardItem
                              title="Lampu Utama Kanan"
                              value={data.headLamp1}
                            />
                            <KirCardItem
                              title="Lampu Utama Kiri"
                              value={data.headLamp2}
                            />
                            <KirCardItem
                              title="Lampu Utama Penyimpangan Kanan"
                              value={data.headLamp3}
                            />
                            <KirCardItem
                              title="Lampu Utama Penyimpangan Kiri"
                              value={data.headLamp4}
                            />
                            <KirCardItemHeading title="Hasil Uji Emisi" />
                            <KirCardItem
                              title="Emisi CO"
                              value={data.coEmision}
                            />
                            <KirCardItem
                              title="Emisi HC"
                              value={data.hcEmision}
                            />
                            <KirCardItem
                              title="Ketebalan Asap"
                              value={data.smokeDensity}
                            />
                          </KirCard>
                          <KirCard title="KETERANGAN HASIL UJI">
                            <KirCardItem
                              title="HASIL UJI"
                              value={data.inspectionResult}
                            />
                            <KirCardItem
                              title="Masa berlaku uji berkala"
                              value={dayjs(data.expiryDate)
                                .locale("id")
                                .format("DD MMMM YYYY")}
                            />
                            <KirCardItem
                              title="Nama Petugas Penguji"
                              value={data.inspector}
                            />
                            <KirCardItem
                              title="NRP(Nomor Registrasi Penguji)"
                              value={data.inspectorNumber}
                            />
                            <KirCardItem
                              title="Nama Kepala Dinas"
                              value={data.director}
                            />
                            <KirCardItem
                              title="Pangkat Kepala Dinas"
                              value={data.directorLevel}
                            />
                            <KirCardItem
                              title="NIP Kepala Dinas"
                              value={data.directorNumber}
                            />
                            <KirCardItem
                              title="Unit Pelaksana Teknis Daerah Pengujian"
                              value={data.agency}
                            />
                            <KirCardItemHeading title="Asal Kendaraan Wajib Uji" />
                            <KirCardItem title="Wilayah" value={data.region} />
                            <KirCardItem
                              title="Wilayah Asal"
                              value={data.origin}
                            />
                          </KirCard>
                        </div>
                      </KirSection>
                    </div>
                  </div>
                </div>
              </>
            );
          }

          if (
            kirApi.state.action == "find" &&
            kirApi.state.status == Status.complete &&
            kirApi.state.error != undefined
          ) {
            return (
              <div className="grow flex flex-col gap-4 items-center justify-center">
                <div className="text-red-500 w-[80%] text-center">
                  {kirApi.state.error.message}
                </div>
                <button
                  className="bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 px-2 py-1 rounded flex items-center gap-1"
                  onClick={() => {
                    kirApi.find(certificateNumber!);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <div>Coba Lagi</div>
                </button>
              </div>
            );
          }

          if (
            kirApi.state.action == "find" &&
            kirApi.state.status == Status.complete &&
            kirApi.state.data == undefined
          ) {
            return (
              <div className="grow flex flex-col gap-4 items-center justify-center">
                <div className="xl:text-lg">Data tidak ditemukan</div>
              </div>
            );
          }

          return (
            <div className="grow flex items-center justify-center">
              <Spinner />
            </div>
          );
        })()}
      </div>
    </>
  );
}
