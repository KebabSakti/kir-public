import { useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import { Status } from "../../../common/type";
import { Kir } from "../../../feature/kir/kir";
import { Spinner } from "../../component/Spinner";
import {
  KirCard,
  KirCardImage,
  KirCardItem,
  KirCardItemHeading,
  KirSection,
} from "./KirComponent";
import { useKirApi } from "./KirHook";

export function FindKir() {
  const kirApi = useKirApi();
  const { certificateNumber } = useParams();

  useEffect(() => {
    if (kirApi.state.status == Status.idle && kirApi.state.data == undefined) {
      kirApi.find(certificateNumber!);
    }
  }, [kirApi.state]);

  return (
    <>
      <div className="min-h-screen flex flex-col pb-6 bg-gray-100">
        <div className="bg-blue-900 p-4 flex items-center justify-center gap-2">
          <img src={logo} className="w-8" />
          <div className="text-white font-semibold text-lg">
            KEMENTERIAN PERHUBUNGAN
          </div>
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
                      <div className="text-green-400 font-semibold">
                        Hasil Uji Masih Berlaku
                      </div>
                      <div>
                        Masa Berlaku Hasil Uji:{" "}
                        {data.expiryDate?.toDateString()}
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
                            value={data.frontPic}
                          />
                          <KirCardImage
                            title="TAMPAK BELAKANG"
                            value={data.backPic}
                          />
                          <KirCardImage
                            title="TAMPAK KIRI"
                            value={data.leftPic}
                          />
                          <KirCardImage
                            title="TAMPAK KANAN"
                            value={data.rightPic}
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
                          <KirCardItem title="MST" value={data.cardNumber} />
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
                              value={data.cardNumber}
                            />
                            <KirCardItem
                              title="Emisi HC"
                              value={data.cardNumber}
                            />
                            <KirCardItem
                              title="Ketebalan Asap"
                              value={data.cardNumber}
                            />
                          </KirCard>
                          <KirCard title="KETERANGAN HASIL UJI">
                            <KirCardItem
                              title="HASIL UJI"
                              value={data.inspectionResult}
                            />
                            <KirCardItem
                              title="Masa berlaku uji berkala"
                              value={data.expiryDate?.toLocaleDateString()}
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
                              value={data.cardNumber}
                            />
                            <KirCardItem
                              title="Pangkat Kepala Dinas"
                              value={data.cardNumber}
                            />
                            <KirCardItem
                              title="NIP Kepala Dinas"
                              value={data.cardNumber}
                            />
                            <KirCardItem
                              title="Unit Pelaksana Teknis Daerah Pengujian"
                              value={data.agency}
                            />
                            <KirCardItemHeading title="Asal Kendaraan Wajib Uji" />
                            <KirCardItem
                              title="Wilayah"
                              value={data.cardNumber}
                            />
                            <KirCardItem
                              title="Wilayah Asal"
                              value={data.cardNumber}
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
            return <>Error</>;
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
